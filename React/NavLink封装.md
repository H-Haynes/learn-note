# 封装

```javascript
    import {NavLink} from "react-router-dom"
    export default function MyNavLink(props){

        return (
            <NavLink activeClassName="current-route" {...props} >       {props.children}
            </NavLink>
        )
    }
```
