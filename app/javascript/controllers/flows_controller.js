import { Controller } from "@hotwired/stimulus";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";

cytoscape.use(dagre);

export default class extends Controller {
  static targets = ["cy", "drawer", "drawerTitle", "drawerContent"];

  connect() {
    this.cyInstance = cytoscape({
      container: this.cyTarget,
      elements: [
        { data: { id: "closed", label: "クローズドガード" } },
        { data: { id: "kusakari", label: "草刈り" } },
        { data: { id: "pass", label: "パスガード" } },
        { data: { id: "sample1", label: "サンプル1" } },
        { data: { id: "sample2", label: "サンプル2" } },
        { data: { id: "sample3", label: "サンプル3" } },
        { data: { id: "sample4", label: "サンプル4" } },
        { data: { id: "sample5", label: "サンプル5" } },
        { data: { source: "closed", target: "kusakari" } },
        { data: { source: "kusakari", target: "pass" } },
        { data: { source: "kusakari", target: "sample1" } },
        { data: { source: "kusakari", target: "sample2" } },
        { data: { source: "closed", target: "sample3" } },
        { data: { source: "sample3", target: "sample4" } },
        { data: { source: "sample3", target: "sample5" } },
      ],
      style: [
        {
          selector: "node",
          style: {
            shape: "round-rectangle",
            width: "label", // ← 非推奨？要確認
            height: 10,
            "background-color": "#F6F9FB",
            label: "data(label)",
            "text-valign": "center",
            "text-halign": "center",
            "color": "#505050",
            "font-size": "8px",
            padding: "4px",
          },
        },
        {
          selector: "edge",
          style: {
            "curve-style": "round-taxi",
            width: 1,
            "line-color": "#d2d7da",
            "target-arrow-shape": "none",
            "taxi-radius": 50,
            "taxi-turn": "10px", // 曲がり角の位置として、ソースノードからの絶対距離を指定する（指定しないとソースノードとターゲットノードの相対距離によって位置算出が行われるらしく、同列ノードの曲がり角の位置がズレる）
          },
        },
      ],
      layout: {
        name: "dagre",
        rankDir: "LR",
        nodeSep: 0,
        edgeSep: 10,
        ranker: "tight-tree",
      },
    });
    
    this.cyInstance.on("tap", "node", (evt) => {
      const node = evt.target;
      this.showDrawer(node.data());
    });
  }

  showDrawer(data) {
    this.drawerTitleTarget.textContent = data.label;
    // this.drawerContentTarget.textContent = `ノードID: ${data.id}`;
    this.drawerTarget.classList.remove("translate-x-full");
    this.drawerTarget.classList.add("translate-x-0");
  }
}
