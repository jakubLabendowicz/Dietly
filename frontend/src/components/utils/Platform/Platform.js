import './Platform.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Platform(props) {
  return (
    <div className="platform">
        <div className="platform__inner">
            {props.platformBar !== undefined &&
                <div className="platform_bar_container">
                    <div className="platform_bar_container__inner">
                        {props.platformBar}
                    </div>
                </div>
            }
            {props.appBar !== undefined &&
                <div className="app_bar_container" style={{
                    top: props.platformBar? 64 : 0
                }}>
                    <div className="app_bar_container__inner">
                        {props.appBar}
                    </div>
                </div>
            }
            {props.page !== undefined &&
                <div className="page_container" style={{
                    marginTop: props.platformBar? 64 : 0,
                    marginLeft: props.appBar? 100 : 0,
                    width: props.appBar? 'calc(100vw - 100px - 20px)': '100%'
                }}>
                    <div className="page_container__inner">
                        {props.page}
                    </div>
                </div>
            }
                <div className="toast_container">
                    <div className="toast_container__inner">
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"/>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Platform;