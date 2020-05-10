import Locker from '../app';

test('should print a ticket with a password when user deposit a luggage given a locker with empty boxes', () => {
  Math.random = jest.fn().mockReturnValue('foo');
  const locker = new Locker();

  const ticket = locker.deposit();

  expect(ticket).toEqual({
    number: 0,
    password: 'foo',
  });
});

test('should notify locker is full when user deposit a luggage given a full locker', () => {
  const locker = new Locker(0);

  const message = locker.deposit();

  expect(message).toEqual('The locker is full.');
});


test('should notify pickup successful when user enter a valid password given a locker with luggage', () => {
  const locker = new Locker(1);
  const ticket = locker.deposit();

  const message = locker.pickup(ticket);

  expect(message).toEqual('Pickup successfully');
});

test('should expire password when user enter a valid password twice given a locker with luggage', () => {
  Math.random = jest.fn().mockReturnValue('foo');
  const locker = new Locker(2);
  const ticket = locker.deposit();
  locker.deposit();
  expect(ticket).toEqual({
    number: 0,
    password: 'foo',
  });

  locker.pickup(ticket);
  const message = locker.pickup(ticket);

  expect(message).toEqual('Invalid password');
});

test('should notify wrong password when user enter an invalid password given a locker', () => {
  const locker = new Locker(1);
  const ticket = locker.deposit();

  const message = locker.pickup({ number: ticket.number, password: 'fake' });

  expect(message).toEqual('Invalid password');
});

test('should notify locker is empty when user chose to pickup given an empty locker', () => {
  const locker = new Locker(1);

  const message = locker.pickup({ number: 1 , password: 'fake' });

  expect(message).toEqual('The locker is empty.');
});