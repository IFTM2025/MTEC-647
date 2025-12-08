const cursor = document.createElement("div");
cursor.id = "cursor";
document.body.appendChild(cursor);

document.addEventListener("mousemove", e => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;


  
})
let x = 0, y = 0;
let targetX = 0, targetY = 0;

document.addEventListener("mousemove", e => {
  targetX = e.clientX;
  targetY = e.clientY;
});

function animate() {
  x += (targetX - x) *0.1;
  y += (targetY - y) *0.1;
  cursor.style.transform = `translate(${x}px, ${y}px)`;
  requestAnimationFrame(animate);
}
animate();;

