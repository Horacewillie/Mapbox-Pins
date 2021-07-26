import {CircularProgress} from '@material-ui/core'
import './loading.css'

const Loading = () => {
    return (
        <div className="main_loader">
            <CircularProgress style ={{color: "#2196F3"}} thickness ={7} />
        </div>
    )
}

export default Loading
