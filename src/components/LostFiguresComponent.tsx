import React from 'react'
import { Figure } from '../models/figures/Figure'

interface LostFiguresComponentProps {
    title: String,
    figures: Figure[]
}

const LostFiguresComponent: React.FC<LostFiguresComponentProps> = ({title, figures}) => {
  return (
    <div className='lost'>
        <h3>{title}</h3>
        {figures.map(figure => 
            <div key={figure.id}>
                {figure.name} {figure.logo && <img src={figure.logo} alt="" width={20} height={20}></img>}
            </div>
        )}
    </div>
  )
}

export default LostFiguresComponent