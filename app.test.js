const total = require('./app');

describe('atv', () => {
    test('no discount', () => {
        expect(total(['atv', 'atv'])).toEqual(219);
    });

    test('single discount (boundary)', () => {
        expect(total(['atv', 'atv', 'atv'])).toEqual(219);
    });

    test('single discount (upper boundary)', () => {
        expect(total(['atv', 'atv', 'atv', 'atv'])).toEqual(328.5);
    });

    test('multiple discount (boundary)', () => {
        expect(total(['atv', 'atv', 'atv', 'atv', 'atv', 'atv'])).toEqual(438);
    });

    test('multiple discount (upper boundary)', () => {
        expect(total(['atv', 'atv', 'atv', 'atv', 'atv', 'atv', 'atv'])).toEqual(547.5);
    });
});

describe('ipd', () => {
    test('no discount', () => {
        expect(total(['ipd', 'ipd', 'ipd', 'ipd'])).toEqual(2199.96);
    });

    test('discount (boundary)', () => {
        expect(total(['ipd', 'ipd', 'ipd', 'ipd', 'ipd'])).toEqual(2499.95);
    });

    test('discount (upper boundary)', () => {
        expect(total(['ipd', 'ipd', 'ipd', 'ipd', 'ipd','ipd', 'ipd', 'ipd'])).toEqual(3999.92);
    });
});

describe('mbp', () => {
    test('no discount', () => {
        expect(total(['mbp', 'mbp', 'mbp', 'mbp', 'mbp'])).toEqual(6999.95);
    });
});

describe('vga', () => {
    test('no discount', () => {
        expect(total(['vga', 'vga', 'vga', 'vga', 'vga'])).toEqual(150);
    });
});

describe('mbp+vga', () => {
    test('mbp same quantity as vga', () => {
        expect(total(['mbp', 'mbp', 'vga', 'vga', 'vga', 'mbp'])).toEqual(4199.97);
    });

    test('mbp less quantity than vga', () => {
        expect(total(['mbp', 'mbp', 'vga', 'vga', 'vga'])).toEqual(2829.98);
    });

    test('mbp more quantity than vga', () => {
        expect(total(['mbp', 'mbp', 'vga', 'vga', 'mbp'])).toEqual(4199.97);
    });
});

describe('multiple products', () => {
    test('atv + vga (single discount)', () => {
        expect(total(['atv', 'atv', 'vga', 'atv'])).toEqual(249);
    });

    test('ipd + mbp + vga (couple of discounts)', () => {
        expect(total(['mbp', 'ipd', 'vga'])).toEqual(1949.98);
    });

    test('ipd + atv + mbp + vga (all discounts)', () => {
        expect(total(['atv', 'atv', 'ipd', 'vga', 'atv', 'ipd', 'ipd', 'ipd', 'mbp', 'ipd', 'vga'])).toEqual(4148.94);
    });
});