import LocalParkingIcon from '@mui/icons-material/LocalParking';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SpaIcon from '@mui/icons-material/Spa';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import PoolIcon from '@mui/icons-material/Pool';
import ChurchIcon from '@mui/icons-material/Church';

const icons = {
    "pool": <PoolIcon />,
    "sauna": <SpaIcon />,
    "laundryroom": <LocalLaundryServiceIcon />,
    "parking": <LocalParkingIcon />,
    "internet": <WifiIcon />,
    "ac":<AcUnitIcon/>,
    "haunted":<ChurchIcon/>
}


const getIcon = (str) => {
    return icons[str.toLowerCase().replaceAll(" ","")]
}
export default getIcon;