
// データの登録
const btnAdd = document.querySelector('#add-submit')
btnAdd.addEventListener("click", (event) => {
    // 現在動作中のクリックイベント以外のボタンイベントをキャンセル（データの送信自体もキャンセルされる）
    event.preventDefault()

    // 登録するデータを収集
    const formData = new FormData()
    formData.append("name", document.querySelector('#add-Name').value)
    formData.append("title", document.querySelector('#add-Title').value)
    formData.append("state", document.querySelector('#add-State').value)
    formData.append("date", document.querySelector('#add-Date').value)
    formData.append("text", document.querySelector('#add-Text').value)

    console.log("送信データ:formData", ...formData)

    // 登録完了メッセージ、エラーメッセージ
    const mes_cont = document.getElementById("message-container")
    const suc_cont = document.getElementById("succese-container")
    const err_cont = document.getElementById("error-container")

    // メッセージを表示できるようにする
    mes_cont.style.display = "block"

    if ((formData.get("name") != "") && (formData.get("title") != "") && (formData.get("date") != "") && (formData.get("text") != "")) {
        // データ登録のWeb APIを/add_ToDoをPOSTメソッドで呼び出す
        fetch("/add_ToDo", {
            method: 'POST',
            body: formData, // 登録するデータ(FormData形式)
        }).then((response) => {
            // console.log("送信されたデータ", response)

            // 登録完了メッセージを表示
            suc_text = "データの登録が完了しました！"
            suc_cont.style.display = "block"
            suc_cont.textContent = suc_text
            // エラーメッセージは隠す
            err_cont.style.display = "none"

            document.querySelector('#add-Name').value = ""
            document.querySelector('#add-Title').value = ""
            document.querySelector('#add-Date').value = ""
            document.querySelector('#add-Text').value = ""
        })
    } else {
        // エラーメッセージの表示
        err_text = "登録に失敗しました"
        err_cont.style.display = "block"
        err_cont.textContent = err_text
        // 登録完了メッセージは隠す
        suc_cont.style.display = "none"
    }
});