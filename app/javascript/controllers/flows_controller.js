// app/javascript/controllers/flow_controller.js
import { Controller } from "@hotwired/stimulus"
import cytoscape from "cytoscape"

export default class extends Controller {
  connect() {
    this.cy = cytoscape({
      container: this.element,
      elements: [
        { data: { id: "closed", label: "クローズドガード" } },
        { data: { id: "kusakari", label: "草刈り" } },
        { data: { id: "pass", label: "パスガード" } },
        { data: { id: "sample1", label: "サンプル1" }},
        { data: { source: "closed", target: "kusakari" } },
        { data: { source: "kusakari", target: "pass" } },
        { data: { source: "kusakari", target: "sample1" }}
      ],
      style: [
        {
          selector: "node",
          style: {
      "shape": "roundrectangle",
      "width": "label",            // ← 非推奨？要確認
      "height": 30,
      "background-color": "#FFFFFF",
      "label": "data(label)",
      "text-valign": "center",
      "text-halign": "center",
      "color": "#1E3A8A",
      "font-size": "14px",
      "padding": "4px"
          }
        },
        {
          selector: "edge",
          style: {
            "background-color": "#1E3A8A",
            "width": 2,
            "line-color": "#1E3A8A",
            "target-arrow-shape": "none",
            "curve-style": "bezier"
          }
        }
      ],
      layout: {
          name: "grid",
  rows: 1,
  avoidOverlap: true,
  spacingFactor: 2
        // name: "preset", // 手動で位置指定
        // positions: {
        //   closed: { x: 100, y: 100 },
        //   kusakari: { x: 250, y: 100 },
        //   pass: { x: 400, y: 100 },
        //   sample1: { x: 400, y: 150 }
        // }
      }
    })
  }
}