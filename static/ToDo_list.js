
// 「削除」ボタン要素をすべて取得
var remove_buttons = document.querySelectorAll('.remove');
// ボタンごとにイベントリスナーを追加
remove_buttons.forEach(function(btn_remove) {
    btn_remove.addEventListener('click', (event) => {
        // 現在動作中のクリックイベント以外のボタンイベントをキャンセル（データの送信自体もキャンセルされる）
        event.preventDefault()

        // 押されたボタンのidを取得
        const btn_id = btn_remove.id
        
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



// 「追加」ボタンを押した時の処理
const btn_add_start = document.querySelector('.add-start')
btn_add_start.addEventListener("click", (event) => {
    // 現在動作中のクリックイベント以外のボタンイベントをキャンセル（データの送信自体もキャンセルされる）
    // event.preventDefault()

    // エラーメッセージを隠す
    const mes_cont = document.getElementById("message-container")
    const err_cont = document.getElementById("error-container")
    mes_cont.style.display = "none"
    err_cont.style.display = "none"

    // データの登録
    const btn_add = document.querySelector('.add-submit')
    btn_add.addEventListener("click", (event) => {
        // 現在動作中のクリックイベント以外のボタンイベントをキャンセル（データの送信自体もキャンセルされる）
        event.preventDefault()

        // 登録するデータを収集
        const formData = new FormData()
        formData.append("name", document.querySelector('#add-Name').value)
        formData.append("title", document.querySelector('#add-Title').value)
        formData.append("text", document.querySelector('#add-Text').value)
        formData.append("date", document.querySelector('#add-Date').value)
        formData.append("state", document.querySelector('#add-State').value)

        console.log("送信データ:formData", ...formData)

        // エラーメッセージ
        const mes_cont = document.getElementById("message-container")
        const err_cont = document.getElementById("error-container")

        if ((formData.get("name") != "") && (formData.get("title") != "") && (formData.get("date") != "") && (formData.get("text") != "")) {
            // データ登録のWeb APIを/add_ToDoをPOSTメソッドで呼び出す
            fetch("/add_ToDo", {
                method: 'POST',
                body: formData, // 登録するデータ(FormData形式)
            }).then((response) => {
                console.log("送信されたデータ", response)

                location.reload()
            })
        } else {
            // メッセージを表示できるようにする
            mes_cont.style.display = "block"

            // エラーメッセージの表示
            err_text = "登録に失敗しました"
            err_cont.style.display = "block"
            err_cont.textContent = err_text
        }
    });
})


/*
// データの登録
const btn_add = document.querySelector('.add-submit')
btn_add.addEventListener("click", (event) => {
    // 現在動作中のクリックイベント以外のボタンイベントをキャンセル（データの送信自体もキャンセルされる）
    event.preventDefault()

    // 登録するデータを収集
    const formData = new FormData()
    formData.append("name", document.querySelector('#add-Name').value)
    formData.append("title", document.querySelector('#add-Title').value)
    formData.append("text", document.querySelector('#add-Text').value)
    formData.append("date", document.querySelector('#add-Date').value)
    formData.append("state", document.querySelector('#add-State').value)

    console.log("送信データ:formData", ...formData)

    // エラーメッセージ
    const mes_cont = document.getElementById("message-container")
    const err_cont = document.getElementById("error-container")

    if ((formData.get("name") != "") && (formData.get("title") != "") && (formData.get("date") != "") && (formData.get("text") != "")) {
        // データ登録のWeb APIを/add_ToDoをPOSTメソッドで呼び出す
        fetch("/add_ToDo", {
            method: 'POST',
            body: formData, // 登録するデータ(FormData形式)
        }).then((response) => {
            console.log("送信されたデータ", response)

            location.reload()
        })
    } else {
        // メッセージを表示できるようにする
        mes_cont.style.display = "block"

        // エラーメッセージの表示
        err_text = "登録に失敗しました"
        err_cont.style.display = "block"
        err_cont.textContent = err_text
    }
});
*/



// 「編集」ボタン要素をすべて取得
var edit_start_buttons = document.querySelectorAll('.edit-start');
// ボタンごとにイベントリスナーを追加
edit_start_buttons.forEach(function(btn_edit_start) {
    btn_edit_start.addEventListener('click', (event) => {
        // 現在動作中のクリックイベント以外のボタンイベントをキャンセル（データの送信自体もキャンセルされる）
        event.preventDefault()

        const mes_cont = document.getElementById("edit-message-container")
        const err_cont = document.getElementById("edit-error-container")
        mes_cont.style.display = "none"
        err_cont.style.display = "none"


        // 押されたボタンのidを取得
        const btn_id = btn_edit_start.id
        
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

            // 「変更を保存」ボタンを押された時の処理
            const btn_edit_end = document.querySelector('.edit-end')
            btn_edit_end.addEventListener("click", (event) => {
                // 現在動作中のクリックイベント以外のボタンイベントをキャンセル（データの送信自体もキャンセルされる）
                event.preventDefault()
            
                const mes_cont = document.getElementById("edit-message-container")
                const err_cont = document.getElementById("edit-error-container")
            
                // 登録するデータを収集
                const formData = new FormData()
                formData.append("name", document.querySelector('#edit-Name').value)
                formData.append("title", document.querySelector('#edit-Title').value)
                formData.append("text", document.querySelector('#edit-Text').value)
                formData.append("date", document.querySelector('#edit-Date').value)
                formData.append("state", document.querySelector('#edit-State').value)
                formData.append("index", document.querySelector('#edit-Index').value)
            
                console.log("送信データ:formData", ...formData)
            
                if ((formData.get("name") != "") && (formData.get("title") != "") && (formData.get("date") != "") && (formData.get("text") != "")) {
                    // データ登録のWeb APIを/edit_end_ToDoをPOSTメソッドで呼び出す
                    fetch("/edit_end_ToDo", {
                        method: 'POST',
                        body: formData,
                    }).then((response) => {
                        console.log("Python > JavaScript : ", response)

                        location.reload()
                    })
                } else {
                    // メッセージを表示できるようにする
                    mes_cont.style.display = "block"

                    // エラーメッセージの表示
                    err_text = "全ての項目を入力して下さい"
                    err_cont.style.display = "block"
                    err_cont.textContent = err_text
                }
            });
                    })
                });
            });


/*
// 「変更を保存」ボタンを押された時の処理
const btn_edit_end = document.querySelector('.edit-end')
btn_edit_end.addEventListener("click", (event) => {
    // 現在動作中のクリックイベント以外のボタンイベントをキャンセル（データの送信自体もキャンセルされる）
    event.preventDefault()

    const mes_cont = document.getElementById("edit-message-container")
    const err_cont = document.getElementById("edit-error-container")

    // 登録するデータを収集
    const formData = new FormData()
    formData.append("name", document.querySelector('#edit-Name').value)
    formData.append("title", document.querySelector('#edit-Title').value)
    formData.append("text", document.querySelector('#edit-Text').value)
    formData.append("date", document.querySelector('#edit-Date').value)
    formData.append("state", document.querySelector('#edit-State').value)
    formData.append("index", document.querySelector('#edit-Index').value)

    console.log("送信データ:formData", ...formData)

    if ((formData.get("name") != "") && (formData.get("title") != "") && (formData.get("date") != "") && (formData.get("text") != "")) {
        // データ登録のWeb APIを/edit_end_ToDoをPOSTメソッドで呼び出す
        fetch("/edit_end_ToDo", {
            method: 'POST',
            body: formData,
        }).then((response) => {
            console.log("Python > JavaScript : ", response)

            location.reload()
        })
    } else {
        // メッセージを表示できるようにする
        mes_cont.style.display = "block"

        // エラーメッセージの表示
        err_text = "全ての項目を入力して下さい"
        err_cont.style.display = "block"
        err_cont.textContent = err_text
    }
});
*/