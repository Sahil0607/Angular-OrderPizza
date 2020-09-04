import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const slideIn = trigger('orderInAnimation', [
    state('in', style({
      opacity: 1,
      transform: 'translateX(0px)'
    })),
    transition('void => *', [     // Style for entering. void to any
      animate(1000, keyframes([
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
          offset: 0
        }),
        style({
          opacity: 0.5,
          transform: 'translateX(-67px)',
          offset: 0.3
        }),
        style({
          opacity: 1,
          transform: 'translateX(-34px)',
          offset: 0.8
        }),
        style({
          opacity: 1,
          transform: 'translateX(0px)',
          offset: 1
        }),
      ]))
    ]),
    transition('* => void', [
      animate(500, style({
        transform: 'translateX(100px)',
        opacity: 0,
      }))
    ])
  ]);
