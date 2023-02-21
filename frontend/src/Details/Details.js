import React from 'react';

const Details = ({npks}) => {
    return (
        <div className='container'>
        <div className='data'>
            <h3>Date: 23/2/23</h3>
            <h3>Location: Dhaka</h3>
            <h3>time: 4.45pm</h3>
        </div>
        <div className='mainDiv'>
            
        <div className='ShowValues'>
            <div className='npk1'>
            <h4>N:{npks.n}</h4>
            {/* {npks.map(i=><p i ={i} key={i.date}>
                {i.n}</p>)} */}
            </div>
        </div>
        <div className='ShowValues'>
            <h4>P:{npks.p}</h4>
            {/* {npks.map(i=><p i ={i} key={i.date}>{i.p}</p>)} */}
        </div>
        <div className='ShowValues'>
            <h4>K:{npks.k}</h4>
            {/* {npks.map(i=><p i ={i} key={i.date}>{i.k}</p>)} */}
        </div>
        <div className='ShowValues'>
            <h4>EC:</h4>
            <p>250</p>
        </div>
        <div className='ShowValues'>
            <h4>Temp:</h4>
            <p>250</p>
        </div>
        <div className='ShowValues'>
            <h4>Moisture:</h4>
            <p>250</p>
        </div>
    </div>        
    </div>
    );
};

export default Details;