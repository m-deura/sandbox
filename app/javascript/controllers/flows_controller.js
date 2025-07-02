import { Controller } from "@hotwired/stimulus";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import cytoscapePopper from "cytoscape-popper";
import { computePosition, flip, shift, limitShift } from "@floating-ui/dom";

function popperFactory(ref, content, opts) {
  const popperOptions = {
    // matching the default behaviour from Popper@2
    // https://floating-ui.com/docs/migration#configure-middleware
    middleware: [flip(), shift({ limiter: limitShift() })],
    ...opts,
  };

  function update() {
    computePosition(ref, content, popperOptions).then(({ x, y }) => {
      Object.assign(content.style, {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        zIndex: 9999,
      });
    });
  }
  update();
  return { update };
}

cytoscape.use(dagre);
cytoscape.use(cytoscapePopper(popperFactory));

export default class extends Controller {
  static targets = ["cy", "drawer", "drawerTitle", "drawerContent"];

  connect() {
    const url = "/api/v1/charts/1";
    fetch(url)
      .then((response) => response.json())
      .then((elements_data) => {
        this.cy = cytoscape({
          container: this.cyTarget,
          autoungrabify: true,
          elements: elements_data,
          style: [
            {
              selector: "node",
              style: {
                shape: "round-rectangle",
                width: 100,
                height: 15,
                "background-color": "#FFFFFF",
                label: "data(label)",
                "text-valign": "center",
                "text-halign": "center",
                color: "#505050",
                "font-size": "8px",
                padding: "4px",
                "border-width": 0.5,
                "border-color": "#000",
                "border-style": "solid",
                "border-cap": "square",
              },
            },
            {
              selector: "edge",
              style: {
                "curve-style": "round-taxi",
                width: 0.5,
                "line-color": "#b1b1b6",
                "target-arrow-shape": "none",
                "taxi-radius": 3,
                "taxi-turn": "20px", // 曲がり角の位置として、ソースノードからの絶対距離を指定す  る（指定しないとソースノードとターゲットノードの相対距離によって位置算出が行われるら  しく、同列ノードの曲がり角の位置がズレる）
              },
            },
          ],
          layout: {
            name: "dagre",
            rankDir: "LR",
            nodeSep: 10,
            edgeSep: 10,
            ranker: "tight-tree",
          },
        });
        this.cy.on("tap", "node", (evt) => {
          const node = evt.target;
          this.showDrawer(node.data());
        });

        this.cy.ready(() => {
          this.cy.nodes().forEach((node) => {
            this.addButtonsToNode(node);
          });
        });

        // let node = this.cy.nodes().first();
        // let popper = node.popper({
        //   content: () => {
        //     let div = document.createElement("div");
        //     div.innerHTML = "Sticky Popper content";
        //     document.body.appendChild(div);
        //     return div;
        //   },
        // });
        // let update = () => {
        //   popper.update();
        // };
        // // TODO: Cytoscape v3系ではノード自体に position イベントを発火しないかも。確証が取れたら下のコメントアウト行を削除する。
        // // node.on('position', update);
        // this.cy.on("pan zoom resize", update);
      });
  }

    addButtonsToNode(node){
      let proper = node.popper({
        content: () => {
          const div = document.createElement("div");
          div.classList.add("node-toolbar");
          div.innerHTML = `
          <button data-action="click->graph#addNode" data-node-id="${node.id()}">＋</button>
          <button data-action="click->graph#toggleCollapse" data-node-id="${node.id()}">－</button>
        `;
          document.body.appendChild(div);
          return div;
        },
        popper: {
          // Optional: Floating UI の middleware オプションなどがあればここに
          placement: "right",
        },
      })
      let update = () => {
        proper.update();
      }
      // TODO: Cytoscape v3系ではノード自体に position イベントを発火しないかも。確証が取れたら下のコメントアウト行を削除する。
      // node.on("position", update);
      this.cy.on("pan zoom resize", update);
    }

  addNode(event) {
    const parentId = event.target.dataset.nodeId;
    console.log("Add node under:", parentId);
    // ここでモーダルを開くなど
  }

  toggleCollapse(event) {
    const nodeId = event.target.dataset.nodeId;
    console.log("Toggle collapse for:", nodeId);
    // 子ノードを一時非表示にする処理を書く（必要ならここに）
  }

  showDrawer(data) {
    this.drawerTitleTarget.textContent = data.label;
    // this.drawerContentTarget.textContent = ノードID: ${data.id};
    this.drawerTarget.classList.remove("translate-x-full");
    this.drawerTarget.classList.add("translate-x-0");
  }
}
