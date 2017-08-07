import HrbStore from "../../Reducer/hrbStore";

export const fetchUserInfo = () => {
    let deptId = window.sessionStorage.getItem('deptId');
    fetch(`${global.host}user/userInfo?token=${global.token}&deptId=${deptId}`).then(res=>{
        return res.json();
    }).then(data=>{
        if(data.code == 0){
            HrbStore.dispatch({
                type: 'EDIT_USER',
                data: data.data
            })
        } else if (data.code == 1) {
            global.message.error(data.msg);
        } else{
            global.message.error('系统异常');
            console.log(data.msg)
        }
    }).catch(err=>console.log(err));
}

export const fetchMenu = () => {
    return fetch(`${global.host}user/roleMenu?token=${global.token}&pid=09`)
}