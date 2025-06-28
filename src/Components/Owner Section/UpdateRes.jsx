import { useLocation } from "react-router-dom"

function UpdateRes() {

    const location=useLocation()
    const res=location.state || {}
    console.log(res)

  return (
    <div>
        update Res
    </div>
  )
}

export default UpdateRes
