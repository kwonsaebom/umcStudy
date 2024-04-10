✨✨ Mission ✨✨

<aside>
💡 해야 할 일 추가와 삭제를 할 수 있는 ToDo List를 만들어보세요.

1주차에서 html, css, js로 ToDo List를 만들어 보았는데요! 리액트로 다시 한 번 같은 기능을 만들어보면서, **일반적인 html, css, js를 사용하여 만드는 것**과 **리액트를 사용하여 만드는 것**의 `**차이**`를 생각해봅시다.

`**hint 1) 화면에 필요한 UI를 컴포넌트화 시켜보세요. 컴포넌트한 파일을 어떻게 화면에 불러올까요?**`

`**hint 2) 내가 작성한 todos 데이터들을 어떻게 관리할까요?**`

```jsx
const [todos, setTodos] = useState([
  { id: 1, content: "Send E-mail", isDone: false },
  { id: 2, content: "Make Work-Books", isDone: false },
  { id: 3, content: "Sleeping", isDone: true },
  { id: 4, content: "Watching You-Tube", isDone: true },
]);
```

`**hint 3) 새롭게 작성된 todo 내용을 어떻게 todos에 추가할 수 있을까요?**`

: useState의 이전 상태값과 spread operator에 대해 알아봅시다.

`**hint 4) 새롭게 작성된 todo를 완료 처리 했을 때 어떻게 해낸 일에 추가할 수 있을까요?**` 

: 완료를 누른 todo가 기존 todo 상태에 포함되어 있는 것이라면, todo의 완료 상태를 바꿔줄 수 있을 것입니다. 

![image](https://github.com/kwonsaebom/umcStudy/assets/94830364/9c4d5f1e-a78d-4a0d-b0df-af67ae700fef)


</aside>

- [ ]  제목, 해야 할 일을 작성할 수 있는 칸, `해야 할 일/해낸 일`을 표시하는 `컴포넌트 UI`를 만들어 주세요.
- [ ]  해야 할 일을 작성할 수 있는 `input 컴포넌트`에 내용을 작성하면 `해야 할 일`에 추가 되도록 해주세요.
- [ ]  해야 할 일의 완료를 누르면 해당 할 일이 `해낸 일`로 이동하도록 해주세요.
- [ ]  해낸 일의 삭제를 누르면 `삭제`되도록 해주세요.

<br/><br/><br/>
✨✨ My Result ✨✨
<img width="1256" alt="image" src="https://github.com/kwonsaebom/umcStudy/assets/94830364/b5c2b4b3-0f96-4833-935a-f88cfb59f794">

