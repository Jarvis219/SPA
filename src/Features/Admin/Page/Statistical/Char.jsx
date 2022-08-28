import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  Title,
  BarSeries,
  Legend
} from '@devexpress/dx-react-chart-material-ui';
import { useState, useEffect } from 'react';
import { Stack, Animation } from '@devexpress/dx-react-chart';
import { useSelector } from 'react-redux';
import { treatmentSTT, orderSTT } from 'Features/type/enumStatus';
import moment from 'moment';
import { changeDisplayPrices } from 'Utils/Utils';

const Root = (props) => (
  <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
);
const Label = (props) => <Legend.Label {...props} sx={{ whiteSpace: 'nowrap' }} />;

const Char = () => {
  const [priceAppointment, setPriceAppointment] = useState(0);
  const [priceTreatment, setPriceTreatment] = useState(0);
  const [priceProducts, setPriceProducts] = useState(0);

  const [day1Appointment, setDay1Appointment] = useState(0);
  const [day1Treatment, setDay1Treatment] = useState(0);
  const [day1Products, setDay1Products] = useState(0);
  const [day2Appointment, setDay2Appointment] = useState(0);
  const [day2Treatment, setDay2Treatment] = useState(0);
  const [day2Products, setDay2Products] = useState(0);
  const [day3Appointment, setDay3Appointment] = useState(0);
  const [day3Treatment, setDay3Treatment] = useState(0);
  const [day3Products, setDay3Products] = useState(0);
  const [day4Appointment, setDay4Appointment] = useState(0);
  const [day4Treatment, setDay4Treatment] = useState(0);
  const [day4Products, setDay4Products] = useState(0);
  const [day5Appointment, setDay5Appointment] = useState(0);
  const [day5Treatment, setDay5Treatment] = useState(0);
  const [day5Products, setDay5Products] = useState(0);
  const [day6Appointment, setDay6Appointment] = useState(0);
  const [day6Treatment, setDay6Treatment] = useState(0);
  const [day6Products, setDay6Products] = useState(0);
  const [day7Appointment, setDay7Appointment] = useState(0);
  const [day7Treatment, setDay7Treatment] = useState(0);
  const [day7Products, setDay7Products] = useState(0);

  const appointments = useSelector((state) => state.appointment.current);
  const treatments = useSelector((state) => state.appointmentTreatment.current);
  const orders = useSelector((state) => state.order.current);
  const customer = useSelector((state) => state.customer.current);

  const carbonEmmision = [
    {
      country: moment().add(-6, 'days').format('YYYY-MM-DD'),
      gold: day1Appointment,
      silver: day1Treatment,
      bronze: day1Products
    },
    {
      country: moment().add(-5, 'days').format('YYYY-MM-DD'),
      gold: day2Appointment,
      silver: day2Treatment,
      bronze: day2Products
    },
    {
      country: moment().add(-4, 'days').format('YYYY-MM-DD'),
      gold: day3Appointment,
      silver: day3Treatment,
      bronze: day3Products
    },
    {
      country: moment().add(-3, 'days').format('YYYY-MM-DD'),
      gold: day4Appointment,
      silver: day4Treatment,
      bronze: day4Products
    },
    {
      country: moment().add(-2, 'days').format('YYYY-MM-DD'),
      gold: day5Appointment,
      silver: day5Treatment,
      bronze: day5Products
    },
    {
      country: moment().add(-1, 'days').format('YYYY-MM-DD'),

      gold: day6Appointment,
      silver: day6Treatment,
      bronze: day6Products
    },
    {
      country: moment().format('YYYY-MM-DD'),
      gold: day7Appointment,
      silver: day7Treatment,
      bronze: day7Products
    }
  ];

  useEffect(() => {
    const arr1 = appointments.filter(
      (item) => Number(item.appointment_status) === Number(Object.keys(treatmentSTT)[2])
    );
    const arr2 = treatments.filter(
      (item) => Number(item.status) === Number(Object.keys(treatmentSTT)[2])
    );
    const arr3 = orders.filter((item) => Number(item.status) >= Number(Object.keys(orderSTT)[4]));
    if (arr1.length > 0) {
      setPriceAppointment(
        arr1.reduce(
          (acc, item) => acc + (item.service_id.service_price - item.service_id.service_sale),
          0
        )
      );
    }
    if (arr2.length > 0) {
      setPriceTreatment(
        arr2.reduce(
          (pre, item) =>
            pre + (item.treatment_id.treatment_price - item.treatment_id.treatment_sale),
          0
        )
      );
    }

    if (arr3.length > 0) {
      setPriceProducts(arr3.reduce((acc, item) => acc + item.totalPrice, 0));
    }
  }, [appointments, treatments, orders]);

  useEffect(() => {
    const dayApp1 = [];
    const dayApp2 = [];
    const dayApp3 = [];
    const dayApp4 = [];
    const dayApp5 = [];
    const dayApp6 = [];
    const dayApp7 = [];

    const dayTreat1 = [];
    const dayTreat2 = [];
    const dayTreat3 = [];
    const dayTreat4 = [];
    const dayTreat5 = [];
    const dayTreat6 = [];
    const dayTreat7 = [];

    const dayOrder1 = [];
    const dayOrder2 = [];
    const dayOrder3 = [];
    const dayOrder4 = [];
    const dayOrder5 = [];
    const dayOrder6 = [];
    const dayOrder7 = [];

    appointments.forEach((item) => {
      if (Number(item.appointment_status) === Number(Object.keys(treatmentSTT)[2])) {
        if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment().add(-6, 'days').format('YYYY-MM-DD')
        ) {
          dayApp1.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment().add(-5, 'days').format('YYYY-MM-DD')
        ) {
          dayApp2.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment().add(-4, 'days').format('YYYY-MM-DD')
        ) {
          dayApp3.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment().add(-3, 'days').format('YYYY-MM-DD')
        ) {
          dayApp4.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment().add(-2, 'days').format('YYYY-MM-DD')
        ) {
          dayApp5.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment().add(-1, 'days').format('YYYY-MM-DD')
        ) {
          dayApp6.push(item);
        } else if (moment(item.updatedAt).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
          dayApp7.push(item);
        }
      }
    });
    treatments.forEach((item) => {
      if (Number(item.status) === Number(Object.keys(treatmentSTT)[2])) {
        if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment().add(-6, 'days').format('YYYY-MM-DD')
        ) {
          dayTreat1.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment().add(-5, 'days').format('YYYY-MM-DD')
        ) {
          dayTreat2.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment().add(-4, 'days').format('YYYY-MM-DD')
        ) {
          dayTreat3.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment().add(-3, 'days').format('YYYY-MM-DD')
        ) {
          dayTreat4.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment().add(-2, 'days').format('YYYY-MM-DD')
        ) {
          dayTreat5.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment().add(-1, 'days').format('YYYY-MM-DD')
        ) {
          dayTreat6.push(item);
        } else if (moment(item.updatedAt).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
          dayTreat7.push(item);
        }
      }
    });

    orders.forEach((item) => {
      if (Number(item.status) >= Number(Object.keys(orderSTT)[4])) {
        if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment().add(-6, 'days').format('YYYY-MM-DD')
        ) {
          dayOrder1.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment().add(-5, 'days').format('YYYY-MM-DD')
        ) {
          dayOrder2.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment().add(-4, 'days').format('YYYY-MM-DD')
        ) {
          dayOrder3.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment().add(-3, 'days').format('YYYY-MM-DD')
        ) {
          dayOrder4.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment().add(-2, 'days').format('YYYY-MM-DD')
        ) {
          dayOrder5.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment().add(-1, 'days').format('YYYY-MM-DD')
        ) {
          dayOrder6.push(item);
        } else if (moment(item.updatedAt).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
          dayOrder7.push(item);
        }
      }
    });

    if (dayApp1.length > 0) {
      setDay1Appointment(
        dayApp1.reduce(
          (pre, items) => pre + (items.service_id.service_price - items.service_id.service_sale),
          0
        )
      );
    }
    if (dayApp2.length > 0) {
      setDay2Appointment(
        dayApp2.reduce(
          (pre, items) => pre + (items.service_id.service_price - items.service_id.service_sale),
          0
        )
      );
    }
    if (dayApp3.length > 0) {
      setDay3Appointment(
        dayApp3.reduce(
          (pre, items) => pre + (items.service_id.service_price - items.service_id.service_sale),
          0
        )
      );
    }
    if (dayApp4.length > 0) {
      setDay4Appointment(
        dayApp4.reduce(
          (pre, items) => pre + (items.service_id.service_price - items.service_id.service_sale),
          0
        )
      );
    }
    if (dayApp5.length > 0) {
      setDay5Appointment(
        dayApp5.reduce(
          (pre, items) => pre + (items.service_id.service_price - items.service_id.service_sale),
          0
        )
      );
    }
    if (dayApp6.length > 0) {
      setDay6Appointment(
        dayApp6.reduce(
          (pre, items) => pre + (items.service_id.service_price - items.service_id.service_sale),
          0
        )
      );
    }
    if (dayApp7.length > 0) {
      setDay7Appointment(
        dayApp7.reduce(
          (pre, items) => pre + (items.service_id.service_price - items.service_id.service_sale),
          0
        )
      );
    }

    if (dayTreat1.length > 0) {
      setDay1Treatment(
        dayTreat1.reduce(
          (pre, items) =>
            pre + (items.treatment_id.treatment_price - items.treatment_id.treatment_sale),
          0
        )
      );
    }
    if (dayTreat2.length > 0) {
      setDay2Treatment(
        dayTreat2.reduce(
          (pre, items) =>
            pre + (items.treatment_id.treatment_price - items.treatment_id.treatment_sale),
          0
        )
      );
    }
    if (dayTreat3.length > 0) {
      setDay3Treatment(
        dayTreat3.reduce(
          (pre, items) =>
            pre + (items.treatment_id.treatment_price - items.treatment_id.treatment_sale),
          0
        )
      );
    }
    if (dayTreat4.length > 0) {
      setDay4Treatment(
        dayTreat4.reduce(
          (pre, items) =>
            pre + (items.treatment_id.treatment_price - items.treatment_id.treatment_sale),
          0
        )
      );
    }
    if (dayTreat5.length > 0) {
      setDay5Treatment(
        dayTreat5.reduce(
          (pre, items) =>
            pre + (items.treatment_id.treatment_price - items.treatment_id.treatment_sale),
          0
        )
      );
    }
    if (dayTreat6.length > 0) {
      setDay6Treatment(
        dayTreat6.reduce(
          (pre, items) =>
            pre + (items.treatment_id.treatment_price - items.treatment_id.treatment_sale),
          0
        )
      );
    }
    if (dayTreat7.length > 0) {
      setDay7Treatment(
        dayTreat7.reduce(
          (pre, items) =>
            pre + (items.treatment_id.treatment_price - items.treatment_id.treatment_sale),
          0
        )
      );
    }

    if (dayOrder1.length > 0) {
      setDay1Products(dayOrder1.reduce((pre, items) => pre + items.totalPrice, 0));
    }
    if (dayOrder2.length > 0) {
      setDay2Products(dayOrder2.reduce((pre, items) => pre + items.totalPrice, 0));
    }
    if (dayOrder3.length > 0) {
      setDay3Products(dayOrder3.reduce((pre, items) => pre + items.totalPrice, 0));
    }
    if (dayOrder4.length > 0) {
      setDay4Products(dayOrder4.reduce((pre, items) => pre + items.totalPrice, 0));
    }
    if (dayOrder5.length > 0) {
      setDay5Products(dayOrder5.reduce((pre, items) => pre + items.totalPrice, 0));
    }
    if (dayOrder6.length > 0) {
      setDay6Products(dayOrder6.reduce((pre, items) => pre + items.totalPrice, 0));
    }
    if (dayOrder7.length > 0) {
      setDay7Products(dayOrder7.reduce((pre, items) => pre + items.totalPrice, 0));
    }
  }, [priceAppointment, priceTreatment, priceProducts]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Quản lý thống kê</h3>
        <div></div>
      </div>
      <div className="my-4">
        <div className="-mx-4 flex">
          <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
            <div className="flex items-center rounded-md bg-white px-5 py-6 shadow-sm">
              <div className="rounded-full bg-pink-600 bg-opacity-75 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <div className="mx-5">
                <div className="text-gray-500">Dịch vụ</div>
                <h4 className="text-2xl font-semibold text-gray-700">
                  {changeDisplayPrices(priceAppointment)}
                </h4>
              </div>
            </div>
          </div>
          <div className="mt-6 w-full px-6 sm:mt-0 sm:w-1/2 xl:w-1/3">
            <div className="flex items-center rounded-md bg-white px-5 py-6 shadow-sm">
              <div className="rounded-full bg-orange-600 bg-opacity-75 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <div className="mx-5">
                <div className="text-gray-500">Liệu trình</div>
                <h4 className="text-2xl font-semibold text-gray-700">
                  {changeDisplayPrices(priceTreatment)}
                </h4>
              </div>
            </div>
          </div>
          <div className="mt-6 w-full px-6 sm:w-1/2 xl:mt-0 xl:w-1/3">
            <div className="flex items-center rounded-md bg-white px-5 py-6 shadow-sm">
              <div className="rounded-full bg-green-600 bg-opacity-75 p-3">
                <svg
                  className="h-8 w-8 text-white"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                    stroke="currentColor"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <div className="mx-5">
                <div className="text-gray-500">Sản phẩm</div>
                <h4 className="text-2xl font-semibold text-gray-700">
                  {changeDisplayPrices(priceProducts)}
                </h4>
              </div>
            </div>
          </div>
          <div className="mt-6 w-full px-6 sm:w-1/2 xl:mt-0 xl:w-1/3">
            <div className="flex items-center rounded-md bg-white px-5 py-6 shadow-sm">
              <div className="rounded-full bg-indigo-600 bg-opacity-75 p-3">
                <svg
                  className="h-8 w-8 text-white"
                  viewBox="0 0 28 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                    fill="currentColor"
                  />
                  <path
                    d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                    fill="currentColor"
                  />
                  <path
                    d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                    fill="currentColor"
                  />
                  <path
                    d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="mx-5">
                <div className="text-gray-500">Khách hàng</div>
                <h4 className="text-2xl font-semibold text-gray-700">{customer.length}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Paper>
        <Chart data={carbonEmmision}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries name="Dịch vụ" valueField="gold" argumentField="country" color="#ffd700" />
          <BarSeries
            name="Liệu trình"
            valueField="silver"
            argumentField="country"
            color="#c0c0c0"
          />
          <BarSeries name="Sản phẩm" valueField="bronze" argumentField="country" color="#cd7f32" />
          <Animation />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <Title text="Biểu đồ thống kê doanh thu (Tuần VND)" />
          <Stack />
        </Chart>
      </Paper>
    </div>
  );
};

export default Char;
