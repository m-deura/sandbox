import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const canvas = document.getElementById("flow-canvas")
    const root = this.createNode("クローズドガード", 400, 50)
    const child = this.createNode("草刈り", 300, 150)
    const child2 = this.createNode("腕十字", 500, 150)

    canvas.appendChild(root)
    canvas.appendChild(child)
    canvas.appendChild(child2)

    canvas.appendChild(this.createLine(400, 50, 300, 150))
    canvas.appendChild(this.createLine(400, 50, 500, 150))
  }

  createNode(label, x, y) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g")
    group.setAttribute("transform", `translate(${x}, ${y})`)

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    circle.setAttribute("r", "30")
    circle.setAttribute("fill", "lightblue")
    group.appendChild(circle)

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
    text.textContent = label
    text.setAttribute("text-anchor", "middle")
    text.setAttribute("dy", ".3em")
    group.appendChild(text)

    group.addEventListener("click", () => alert(`技: ${label}`))
    return group
  }

  createLine(x1, y1, x2, y2) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
    line.setAttribute("x1", x1)
    line.setAttribute("y1", y1)
    line.setAttribute("x2", x2)
    line.setAttribute("y2", y2)
    line.setAttribute("stroke", "gray")
    return line
  }
}
