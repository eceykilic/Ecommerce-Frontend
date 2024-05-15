import React from "react";
import { useLocation, useHistory } from "react-router-dom";

function useQueryParams() {
    const { search, pathname } = useLocation();
    const history = useHistory();

    const queryParams = React.useMemo(() => {
        const params = new URLSearchParams(search);
        const paramsObject = {};

        for (const [key, value] of params.entries()) {
            paramsObject[key] = value;
        }

        return paramsObject;
    }, [search]);

    const setQueryParams = (newParams) => {
        const params = new URLSearchParams();

        for (const key in newParams) {
            params.append(key, newParams[key]);
        }

        history.push({
            pathname: pathname,
            search: params.toString(),
        });
    };

    return [queryParams, setQueryParams];
}

export default useQueryParams;
