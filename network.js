const http = require('http');
const PORT = process.env.PORT || 5000;
const todos = require('./todos');
const getRequestData = require('./utils');

const server = http.createServer(async (request, response) => {
    if (request.url === '/api/v1/todos' && request.method === 'GET') {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
        response.end(JSON.stringify(todos));
    } 
    else if (request.url === '/api/v1/todos' && request.method === 'POST') {
        try {
            const req_body = await getRequestData(request);
            console.log("Received request body:", req_body); // Debugging log
            const newTodo = JSON.parse(req_body);
            console.log("Parsed newTodo:", newTodo); // Debugging log
            todos.push(newTodo);
            response.writeHead(201, {
                'Content-Type': 'application/json'
            });
            response.end(JSON.stringify(newTodo));
        } catch (error) {
            console.error("Error processing request:", error); // Error log
            response.writeHead(400, {
                'Content-Type': 'application/json'
            });
            response.end(JSON.stringify({ message: 'Invalid request data' }));
        }
    } else {
        response.writeHead(404, {
            'Content-Type': 'application/json'
        });
        response.end(JSON.stringify({ message: 'Not Found' }));
    }
});

server.listen(PORT, () => {
    console.log("Server is ready and running at port", PORT);
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.log("PORT already in use.");
    } else {
        console.log("Server error:", error);
    }
});
