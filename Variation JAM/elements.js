class SchoolBus {
    constructor(x, y, speed = 0, capacity = 40) {
        this.x = x; // horizontal position
        this.y = y; // vertical position
        this.speed = speed; // speed in pixels per frame
        this.capacity = capacity; // number of seats
        this.passengers = 0; // current passengers
        this.width = 120; // bus width
        this.height = 60; // bus height
    }

    move() {
        this.x += this.speed;
    }

    boardPassengers(num) {
        this.passengers = Math.min(this.capacity, this.passengers + num);
    }

    leavePassengers(num) {
        this.passengers = Math.max(0, this.passengers - num);
    }

    draw(ctx) {
        // Draw bus body
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw windows
        ctx.fillStyle = "lightblue";
        for (let i = 1; i <= 4; i++) {
            ctx.fillRect(this.x + i * 25, this.y + 10, 20, 20);
        }

        // Draw wheels
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x + 20, this.y + this.height, 15, 0, Math.PI * 2);
        ctx.arc(this.x + this.width - 20, this.y + this.height, 15, 0, Math.PI * 2);
        ctx.fill();

        // Draw passenger count
        ctx.fillStyle = "black";
        ctx.font = "14px Arial";
        ctx.fillText(`Passengers: ${this.passengers}/${this.capacity}`, this.x + 10, this.y - 10);
    }
}
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bus = new SchoolBus(50, 100, 2);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bus.move();
    bus.draw(ctx);
    requestAnimationFrame(gameLoop);
}

gameLoop();