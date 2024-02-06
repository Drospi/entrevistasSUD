import moment from 'moment';

const Martes = () => {
    const futureTuesdays = [];
  function FutureTuesdays() {
    const currentDate = moment() ;
    const futureTuesdays = [];
  
    // Encontrar los próximos 10 martes
    for (let i = 0; i < 10; i++) {
      currentDate.add(1, 'weeks');
      while (currentDate.day() !== 2) {
        currentDate.add(1, 'days');
      }
      futureTuesdays.push(currentDate.format('YYYY-MM-DD'));
    }
    console.log(futureTuesdays);
  }
    FutureTuesdays();
  return (
    <div>
      <h1>Futuros Martes</h1>
      <ul>
        {futureTuesdays.map((tuesday, index) => (
          <li key={tuesday}>{index}</li>
        ))}
      </ul>
    </div>
  )
}

export default Martes