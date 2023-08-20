import React from "react";

function ProtectedRoute(props) {
    const { token, children, redirectTo} = props
    return (
        <div>{ token ? children : redirectTo }</div>
    )
}

export default ProtectedRoute