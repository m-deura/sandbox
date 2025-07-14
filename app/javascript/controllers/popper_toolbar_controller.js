import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  addNode(event) {
    const nodeId = event.target.dataset.nodeId;
    console.log("Clicked + on", nodeId);
    // RailsへのPOSTなどを処理
  }

  toggleCollapse() {
    console.log("test")
  }
}
