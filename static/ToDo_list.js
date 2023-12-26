
// 「削除」ボタン要素をすべて取得
var remove_buttons = document.querySelectorAll('.remove');
// ボタンごとにイベントリスナーを追加
remove_buttons.forEach(function(btn) {
    btn.addEventListener('click', (event) => {
        // 現在動作中のクリックイベント以外のボタンイベントをキャンセル（データの送信自体もキャンセルされる）
        event.preventDefault()

        // 押されたボタンのidを取得
        const btn_id = btn.id
        
        // 登録するデータを収集
        const formData = new FormData()
        formData.append("index", btn_id)

        console.log("JavaScript > Python : ", ...formData)

        // データ登録のWeb APIを/remove_ToDoをPOSTメソッドで呼び出す
        fetch("/remove_ToDo", {
            method: 'POST',
            body: formData,
        }).then((response) => {
            console.log("Python > JavaScript : ", response)

            // ページの再読み込み
            location.reload()
        })
    });
});



// 「編集」ボタン要素をすべて取得
var edit_start_buttons = document.querySelectorAll('.edit-start');
// ボタンごとにイベントリスナーを追加
edit_start_buttons.forEach(function(btn) {
    btn.addEventListener('click', (event) => {
        // 現在動作中のクリックイベント以外のボタンイベントをキャンセル（データの送信自体もキャンセルされる）
        event.preventDefault()

        // 押されたボタンのidを取得
        const btn_id = btn.id
        
        // 登録するデータを収集
        const formData = new FormData()
        formData.append("index", btn_id)

        console.log("JavaScript > Python : ", ...formData)

        // データ登録のWeb APIを/edit_start_ToDoをPOSTメソッドで呼び出す
        fetch("/edit_start_ToDo", {
            method: 'POST',
            body: formData,
        }).then((response) => {
            console.log("Python > JavaScript : ", response)

            // 編集画面に編集前の値を各フォームに設定しておく
            response.json().then((data) => {
                document.querySelector('#edit-Name').value = data.name
                document.querySelector('#edit-Title').value = data.title
                document.querySelector('#edit-Text').value = data.text
                document.querySelector('#edit-Date').value = data.date
                document.querySelector('#edit-State').value = data.state
                document.querySelector('#edit-Index').value = btn_id
            })
        })
    });
});



// 「変更を保存」ボタン要素をすべて取得
const btnAdd = document.querySelector('.edit-end')
btnAdd.addEventListener("click", (event) => {
    // 現在動作中のクリックイベント以外のボタンイベントをキャンセル（データの送信自体もキャンセルされる）
    event.preventDefault()

    // 登録するデータを収集
    const formData = new FormData()
    formData.append("name", document.querySelector('#edit-Name').value)
    formData.append("title", document.querySelector('#edit-Title').value)
    formData.append("state", document.querySelector('#edit-State').value)
    formData.append("date", document.querySelector('#edit-Date').value)
    formData.append("text", document.querySelector('#edit-Text').value)
    formData.append("index", document.querySelector('#edit-Index').value)

    console.log("送信データ:formData", ...formData)

    // データ登録のWeb APIを/edit_end_ToDoをPOSTメソッドで呼び出す
    fetch("/edit_end_ToDo", {
        method: 'POST',
        body: formData,
    }).then((response) => {
        console.log("Python > JavaScript : ", response)

        location.reload()
    })
});