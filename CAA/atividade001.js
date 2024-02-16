class PriorityQueue {
    constructor() {
      this.queue = [];
    }
  
    enqueue(element) {
      this.queue.push(element);
      this.sort();
    }
  
    dequeue() {
      if (!this.isEmpty()) {
        return this.queue.shift();
      }
      return "Queue is empty";
    }
  
    isEmpty() {
      return this.queue.length === 0;
    }
  
    sort() {
      this.queue.sort((a, b) => a.priority - b.priority);
    }
  }
  
  class Graph {
    constructor() {
      this.nodes = [];
      this.adjacencyList = {};
    }
  
    addNode(node) {
      this.nodes.push(node);
      this.adjacencyList[node] = [];
    }
  
    addEdge(node1, node2, weight) {
      this.adjacencyList[node1].push({ node: node2, weight });
      this.adjacencyList[node2].push({ node: node1, weight });
    }
  
    dijkstra(startNode, endNode) {
      const distances = {};
      const previous = {};
      const priorityQueue = new PriorityQueue();
  
      this.nodes.forEach((node) => {
        if (node === startNode) {
          distances[node] = 0;
          priorityQueue.enqueue({ node, priority: 0 });
        } else {
          distances[node] = Infinity;
          priorityQueue.enqueue({ node, priority: Infinity });
        }
        previous[node] = null;
      });
  
      while (!priorityQueue.isEmpty()) {
        const smallest = priorityQueue.dequeue().node;
        if (smallest === endNode) {
          const path = [];
          while (previous[smallest]) {
            path.push(smallest);
            smallest = previous[smallest];
          }
          return path.concat(startNode).reverse();
        }
  
        if (smallest || distances[smallest] !== Infinity) {
          this.adjacencyList[smallest].forEach((neighbor) => {
            const candidate = distances[smallest] + neighbor.weight;
            if (candidate < distances[neighbor.node]) {
              distances[neighbor.node] = candidate;
              previous[neighbor.node] = smallest;
              priorityQueue.enqueue({ node: neighbor.node, priority: candidate });
            }
          });
        }
      }
      return null;
    }
  }