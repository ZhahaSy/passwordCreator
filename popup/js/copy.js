export function copyToClickBoard(content){
    navigator.clipboard.writeText(content)
        .then(() => {
        alert('复制成功')
    })
        .catch(err => {
        alert('复制失败')
        console.log('Something went wrong', err);
    })
 
}