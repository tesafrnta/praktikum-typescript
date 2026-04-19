import http from "http";

const users = [
  { id: 1, name: "Tesa" },
  { id: 2, name: "Firna" }
];

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mouse" }
];

const server = http.createServer((req, res) => {
  const url = req.url || "/";
  const method = req.method || "GET";

  // ================= HOME =================
  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Welcome Home" }));
  }

  // ================= GET ALL USERS =================
  else if (url === "/users" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  }

  // ================= GET USER BY ID =================
  else if (url.startsWith("/users/") && method === "GET") {
    const id = parseInt(url.split("/")[2]);
    const user = users.find(u => u.id === id);

    if (user) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404);
      res.end("User not found");
    }
  }

  // ================= POST USERS =================
  else if (url === "/users" && method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const newUser = JSON.parse(body);

      users.push({
        id: users.length + 1,
        name: newUser.name
      });

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        message: "User added successfully",
        users
      }));
    });
  }

  // ================= GET ALL PRODUCTS =================
  else if (url === "/products" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  }

  // ================= GET PRODUCT BY ID =================
  else if (url.startsWith("/products/") && method === "GET") {
    const id = parseInt(url.split("/")[2]);
    const product = products.find(p => p.id === id);

    if (product) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    } else {
      res.writeHead(404);
      res.end("Product not found");
    }
  }

  // ================= NOT FOUND =================
  else {
    res.writeHead(404);
    res.end("Route not found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});