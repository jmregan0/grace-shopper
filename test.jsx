// const SelectedUser= ({selected, userHomes, guest, host, displayHostHistory, showHostHistory}) => {
//   const user = <selected></selected>
//   return (
//     <div className="panel">

//             <div className="panel with-nav-tabs">

//                 <div className="panel-heading">
//                     <ul className="nav nav-tabs">
//                         <li className="active"><a href="#tab1default" data-toggle="tab">Upcoming Reservations</a></li>
//                         <li><a href="#tab2default" data-toggle="tab">Past Reservations</a></li>
//                         <li><button onClick={() =>{displayHostHistory}}>Transaction History as Host</button></li>
//                     </ul>
//                 </div>
//                 <div className="panel-body">
//                     <div className="tab-content">
//                         <div className="tab-pane fade in active" id="tab1default">
//                             <h1>Your Upcoming Reservations</h1>
//                             <div className="table table-striped table-hover">

//                             </div>
//                         </div>
//                         <div className="tab-pane fade" id="tab2default">
//                         Default 2
//                         </div>
//                         <div className="tab-pane fade" id="tab3default">
//                             {showHostHistory && (
//                             <div className="table table-striped table-hover">
//                                 <h1>Transaction History as Host</h1>
//                                 <div className="table table-striped table-hover">
//                                     {host.length ? host.map(transaction => {
//                                         console.log("host", host)
//                                         return (
//                                             <div key={transaction.id}>
//                                                 <div className="order order-header row thead-inverse">
//                                                     <div className="order-column">
//                                                 <div><strong>Order placed</strong></div>
//                                                     <div>{moment(transaction.created_at).format('LL')}</div>
//                                                 </div>
//                                                 <div className="order-column">
//                                                     <div><strong>Total</strong></div>
//                                                     <div>${transaction.price * (moment(transaction.endDate).diff(moment(transaction.startDate), 'days'))}</div>
//                                                 </div>
//                                                 <div className="order-column">
//                                                     <div><strong>Guest</strong></div>
//                                                     <div><a href={`mailto:${transaction.guest.email}`}>{transaction.guest.name}</a></div>
//                                                 </div>
//                                                 <div className="right">
//                                                     <div><strong>Order #</strong></div>
//                                                     <div className="center">{transaction.id}</div>
//                                                 </div>
//                                             </div>
//                                             <div className="order order-body flex">
//                                                 <div className="left"><img src={transaction.home.imageUrl} className="order-thumb"/></div>
//                                                 <div className="no-flex">
//                                                     <div className="bottom-padding"><Link to="/homes/{transaction.home.id}" className="link">{transaction.home.name}</Link></div>
//                                                     <div className="bottom-padding">From <strong>{moment.utc(transaction.startDate).format('LL')}</strong> to <strong>{moment.utc(transaction.endDate).format('LL')}</strong></div>
//                                                     <div className="price">${transaction.price}</div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         )
//                                     }) : <p>No one has made reservations for your home yet.</p>}
//                                 </div>
//                             </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//   </div>
//   )
// }

// export default SelectedUser;
