const userName = document.getElementById('name');
const email = document.getElementById('email');
const age = document.getElementById('age');
const pw = document.getElementById('pw');
const pwChk = document.getElementById('pwCheck');

const form = document.getElementById('form');
const modal = document.querySelector(".modal-wrapper");
const close = document.getElementById('close');

const check = [0, 0, 0, 0, 0];

// Show input error message
function showError(input, message) {
    // input의 부모 요소 가져오기
    const formControl = input.parentElement; // div
    // formControl 내부에서 small이라는 태그 가져오기
    const small = formControl.querySelector('small');
    // small 태그의 텍스트 변경
    small.innerText = message;
    small.style.color = 'red';
  }

function showSuccess(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    small.style.color = 'green';
}


function nameCheck(input) {
    if(input.value === '') {
        showError(input, '필수 입력 항목입니다!');
    } else {
        showSuccess(input, '멋진 이름이네요!');
        check[0]=1;
    }
};

function emailCheck(input) {
    if (input.value === '' || input.value.indexOf('@') === -1) {
        showError(input, '올바른 이메일 형식이 아닙니다!');
    } else {
        showSuccess(input, '올바른 이메일 형식입니다!');
        check[1]=1;
    } 
};

function ageCheck(input) {
    if (input.value === "") {
        showError(input, "나이를 입력해주세요!");
    }
    else {
        if (isNaN(Number(input.value))) {
            showError(input,"나이는 숫자 형식이어야 합니다!"); 
        } else if (Number(input.value)<0) { 
            showError(input,"나이는 음수가 될 수 없습니다!"); 
        } else if (Number.isInteger(Number(input.value)) === false) {
            showError(input,"나이는 소수가 될 수 없습니다!"); 
        } else if (Number(input.value)<19) { 
            showError(input, "미성년자는 가입할 수 없습니다!"); 
        } else { 
            showSuccess(input,"올바른 나이 형식입니다!");
            check[2]=1;
        }
    }
}

function pwCheck(input) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/; // 정규 표현식 수정: +를 추가하여 최소 한 글자 이상의 문자열을 요구함

    if (pw.value.length < 4) {
        showError(input, "비밀번호는 최소 4자리 이상이어야 합니다.");
    } else if (pw.value.length > 12) {
        showError(input, "비밀번호는 최대 12자리까지 가능합니다.");
    } else if (!regex.test(input.value)) { // 정규 표현식을 사용하여 비밀번호 형식 검사
        showError(input, "영어, 특수문자, 숫자를 모두 사용해야합니다!");
    } else {
        showSuccess(input, "올바른 비밀번호입니다.");
        check[3]=1;
    }
};

function pwChkCheck(input) {
    if(input.value != "" && input.value === pw.value){
         showSuccess(input,"비밀번호가 일치합니다.");
         check[4]=1;
     } else {
         showError(input, "비밀번호가 일치하지 않습니다.");
     }
 }

form.addEventListener("submit", function (e) {

    e.preventDefault(); 

    nameCheck(userName);
    emailCheck(email);
    ageCheck(age);
    pwCheck(pw);
    pwChkCheck(pwChk);

    if (check.join('').indexOf('0')==-1) {
        modal.style.display='flex';
    }
});

close.onclick = () => {
    modal.style.display = "none";
}