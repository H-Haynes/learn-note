export default {
    get(): any[] {
        const list = JSON.parse(localStorage.getItem('todoList'))
        if (!list) {
            return []
        } else {
            if (Array.isArray(list)) {
                return list
            } else {
                throw new Error('invalid value "todoList" in localStorage')
            }
        }
    },
    set(todoList): void {
        localStorage.setItem('todoList', JSON.stringify(todoList))
    },
    push(todo): void {
        const list = this.get();
        list.push({ task: todo, status: 0 });
        this.set(list)
    },
    /**
     * 生成随机字符串，使用随机数，转成16进制字符串，截取小数点后6位作为返回值
     * @returns 
     */
    generateRandomStr(): string {
        return Math.random().toString(16).slice(2, 8);
    }
}