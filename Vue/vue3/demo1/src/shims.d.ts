
declare module '*.vue' {
    import { ComponentOptions, DefineComponent } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
    // const component: DefineComponent<{}, {}, any>
    // export default component
}