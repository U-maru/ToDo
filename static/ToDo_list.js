
// 削除ボタン要素をすべて取得
var remove_buttons = document.querySelectorAll('.remove');
// ボタンごとにイベントリスナーを追加
remove_buttons.forEach(function(button) {
    button.addEventListener('click', (event) => {
        // 現在動作中のクリックイベント以外のボタンイベントをキャンセル（データの送信自体もキャンセルされる）
        event.preventDefault()

        // 押されたボタンのidを取得
        const btn_id = button.id
        
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