

// 새로운 경로 시작
class HeartObject {
  constructor(x, y, size, color, speed, rotationSpeed) {
    this.x = x; // 하트의 x 좌표
    this.y = y; // 하트의 y 좌표
    this.size = size; // 하트의 크기
    this.color = color; // 하트의 색상
    this.speed = speed; // 하트의 이동 속도
    this.rotationSpeed = rotationSpeed; // 하트의 회전 속도
    // 이동 방향을 랜덤하게 설정
    this.rotation = Math.random() * Math.PI * 2; // 랜덤한 시작 방향
    // 이동 속도와 방향 계산
    this.vx = Math.cos(this.rotation) * speed;
    this.vy = Math.sin(this.rotation) * speed;
}

// 하트를 그리는 메소드
draw(ctx) {
    // 이전과 같은 코드...
}

  draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.scale(this.size, this.size);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let t = 0; t < Math.PI * 2; t += 0.01) {
          let x = 16 * Math.pow(Math.sin(t), 3);
          let y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
          ctx.lineTo(x, y);
      }
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();

      this.rotation += this.rotationSpeed;
      this.x += this.vx;
      this.y += this.vy;
  }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
let heartCount = 0;

function generateHeart() {
  if (heartCount < 100) {
      const size = Math.random() * 0.5 + 0.1;
      const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      const speed = Math.random() * 2 + 0.5;
      const rotationSpeed = Math.random() * 0.1 - 0.05;
      const x = mouseX;
      const y = mouseY;
      hearts.push(new HeartObject(x, y, size, color, speed, rotationSpeed));
      heartCount++;
  }
}

let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

setInterval(() => {
  generateHeart();
}, 200);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = hearts.length - 1; i >= 0; i--) {
      hearts[i].draw(ctx);
      if (hearts[i].x < -50 || hearts[i].x > canvas.width + 50 || hearts[i].y < -50 || hearts[i].y > canvas.height + 50) {
          hearts.splice(i, 1);
          heartCount--;
      }
  }
  requestAnimationFrame(draw);
}

draw();
