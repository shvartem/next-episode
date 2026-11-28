import {useState} from 'react';
import {useLocation, useNavigationType} from 'react-router';

export const useShouldLoadSearchLocation = () => {
    const {key: locationKey} = useLocation();
    const [initialLocationKey] = useState(locationKey);
    const navigationType = useNavigationType();

    return locationKey === initialLocationKey || navigationType === 'POP';
};
