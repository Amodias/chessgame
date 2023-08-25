import Pawn from '../pawns/pawn';
import Knight from '../pawns/knight';
import Bishop from '../pawns/bishop';
import King from '../pawns/king';
import Queen from '../pawns/queen';
import Rook from '../pawns/rook';

export const initilaeState = () => {

  return {
    a1: { component: Rook, type: 'r', color: 'white' },
    b1: { component: Knight, type: 'k', color: 'white' },
    c1: { component: Bishop, type: 'b', color: 'white' },
    d1: { component: Queen, type: 'q', color: 'white' },
    e1: { component: King, type: 'k', color: 'white' },
    f1: { component: Bishop, type: 'b', color: 'white' },
    g1: { component: Knight, type: 'k', color: 'white' },
    h1: { component: Rook, type: 'r', color: 'white' },
    a2: { component: Pawn, type: 'p', color: 'white' },
    b2: { component: Pawn, type: 'p', color: 'white' },
    c2: { component: Pawn, type: 'p', color: 'white' },
    d2: { component: Pawn, type: 'p', color: 'white' },
    e2: { component: Pawn, type: 'p', color: 'white' },
    f2: { component: Pawn, type: 'p', color: 'white' },
    g2: { component: Pawn, type: 'p', color: 'white' },
    h2: { component: Pawn, type: 'p', color: 'white' },
    a7: { component: Pawn, type: 'p', color: 'black' },
    b7: { component: Pawn, type: 'p', color: 'black' },
    c7: { component: Pawn, type: 'p', color: 'black' },
    d7: { component: Pawn, type: 'p', color: 'black' },
    e7: { component: Pawn, type: 'p', color: 'black' },
    f7: { component: Pawn, type: 'p', color: 'black' },
    g7: { component: Pawn, type: 'p', color: 'black' },
    h7: { component: Pawn, type: 'p', color: 'black' },
    a8: { component: Rook, type: 'r', color: 'black' },
    b8: { component: Knight, type: 'k', color: 'black' },
    c8: { component: Bishop, type: 'b', color: 'black' },
    d8: { component: Queen, type: 'q', color: 'black' },
    e8: { component: King, type: 'k', color: 'black' },
    f8: { component: Bishop, type: 'b', color: 'black' },
    g8: { component: Knight, type: 'k', color: 'black' },
    h8: { component: Rook, type: 'r', color: 'black' },
  }
}