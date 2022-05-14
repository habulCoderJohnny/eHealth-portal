import chair from '../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
const AppointmentBanner = ({date, setDate}) => {

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img className='max-w-lg' src={chair} alt='dentist chair'/>
                <div>
                <DayPicker
                mode='single'
                selected={date}
                onSelect={setDate}
                styles={{
                    caption: { color: 'red' }
                  }}
                />
                </div>
                {/* <p>Select your Appointment date</p> */}
            </div>
        </div>
    );
};

export default AppointmentBanner;