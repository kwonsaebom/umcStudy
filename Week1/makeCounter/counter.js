const number = document.getElementById('number');
const increase = document.getElementById('increase');
const decrease = document.getElementById('decrease');


increase.onclick = () => {
    const current =parseInt(number.innerText);
    number.innerText = current + 1;
    console.log("Increase 가 클릭됨");
}

decrease.onclick = () => {
    const current = parseInt(number.innerText);
    number.innerText = current - 1;
    console.log('Decrease 가 클릭됨');
}