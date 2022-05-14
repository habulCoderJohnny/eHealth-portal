import React from 'react';
import Fluoride  from '../../assets/images/fluoride.png';
import cavity  from '../../assets/images/cavity.png';
import whitening  from '../../assets/images/whitening.png';
import Service from './Service';

const Services = () => {
    const contents = [
        {
        _id:1,
        name:'Fluoride Treatment',
        describe: 'Fluoride treatments are usually done at six-month cleaning appointments. Treatment involves the dentist applying varnish to your teeth using a gel, foam, or a rinse. We may also recommend fluoride treatments for adults who are at high risk of tooth decay.',
        img: Fluoride
        },
        {
        _id:2,
        name:'Cavity Filling',
        describe: 'To treat a cavity your dentist will remove the decayed portion of the tooth and then "fill" the area on the tooth where the decayed material was removed. Fillings are also used to repair cracked or broken teeth and teeth that have been worn down from misuse.',
        img: cavity
        },
        {
        _id:3,
        name:'Teeth Whitening',
        describe: 'Everyone notices a bright, white, glowing smile. And everyone notices how confident you feel when you have that beautiful smile. That’s why we utilize long-lasting Teeth Whitening procedure — because we want you to glow with pride and confidence.',
        img: whitening
        },
    ];
    return (
        <div className='my-28'>
            <div className='text-center mb-10'>
                <h4 className='text-primary text-xl font-bold uppercase'>Our Services</h4>
                <h1 className='text-4xl font-mono'>Services We Provide</h1>
            </div>
            <div className='grid sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                contents.map(content=><Service
                key={content._id}
                content = {content}
                ></Service>)
                }
            </div>
        </div>
    );
};

export default Services;