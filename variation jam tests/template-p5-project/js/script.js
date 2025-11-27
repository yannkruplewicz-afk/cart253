// -----------------------------------------------------
// SchoolBus Class
// -----------------------------------------------------
class SchoolBus {
    constructor(x, y, speed = 0, capacity = 40) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.capacity = capacity;
        this.passengers = 0;

        this.width = 120;
        this.height = 60;
    }

    move() {
        this.x += this.speed;

        // Wrap around screen
        if (this.x > canvas.width) {
            this.x = -this.width;
        }
    }

    boardPassengers(num) {
        this.passengers = Math.min(this.capacity, this.passengers + num);
    }

    leavePassengers(num) {
        this.passengers = Math.max(0, this.passengers - num);
    }

    draw(ctx) {
        // Body
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Windows
        ctx.fillStyle = "lightblue";
        for (let i = 1; i <= 4; i++) {
            ctx.fillRect(this.x + i * 25, this.y + 10, 20, 20);
        }

        // Wheels
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x + 20, this.y + this.height, 15, 0, Math.PI * 2);
        ctx.arc(this.x + this.width - 20, this.y + this.height, 15, 0, Math.PI * 2);
        ctx.fill();

        // Passenger text
        ctx.fillStyle = "black";
        ctx.font = "14px Arial";
        ctx.fillText(
            `Passengers: ${this.passengers}/${this.capacity}`,
            this.x + 10,
            this.y - 10
        );
    }
}

// -----------------------------------------------------
// Canvas Setup
// -----------------------------------------------------
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Create bus
const bus = new SchoolBus(50, 200, 2);

// -----------------------------------------------------
// Game Loop
// -----------------------------------------------------
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bus.move();
    bus.draw(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();
