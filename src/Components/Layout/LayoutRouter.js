import { Route, Routes } from "react-router-dom";

//roures
import Bank from "Components/Pages/Bank/Bank";

export default function() {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<>dice</>}/>
                <Route path={'/dice'} element={<>dice</>}/>
                <Route path={'/bank'} element={<Bank/>}/>
            </Routes>
        </>
    )
}