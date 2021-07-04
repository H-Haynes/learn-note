import { computed, onMounted, onUnmounted, ref } from "vue"

enum filterType {
    全部 = 'all',
    进行 = 'running',
    完成 = 'done'
}

export default function (todoListRef) {
    const statusFilterRef = ref('all');
    const filterChange = () => {
        const statusList = ['all', 'running', 'done'];
        const hash = location.hash.replace(/#\//, '');
        if (statusList.includes(hash)) {
            statusFilterRef.value = hash;
        } else {
            location.hash = '';
            statusFilterRef.value = 'all'
        }
    };
    onMounted(() => {
        window.addEventListener('hashchange', filterChange)
    })
    onUnmounted(() => {
        window.removeEventListener('hashchange', filterChange)
    })

    // const filteredList = computed({
    //     get(){

    //     },
    //     set(){

    //     }
    // })
    const filteredList = computed(() => {
        if (statusFilterRef.value === filterType.全部) {
            return todoListRef.value
        } else if (statusFilterRef.value === filterType.进行) {
            return todoListRef.value.filter(ele => ele.status == 0)
        } else if (statusFilterRef.value === filterType.完成) {
            return todoListRef.value.filter(ele => ele.status == 1)
        } else {
            throw new Error('invalid filter status')
        }
    })
    return {
        statusFilterRef,
        filteredList
    }
}