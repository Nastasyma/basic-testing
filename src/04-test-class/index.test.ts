import lodash from 'lodash';

import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  let account: BankAccount;
  const balance = 500;

  beforeEach(() => {
    account = getBankAccount(balance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(balance + 5)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const accountForTransfer = getBankAccount(balance);
    expect(() => account.transfer(balance + 5, accountForTransfer)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const amount = 50;
    expect(() => account.transfer(amount, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const amount = 50;
    account.deposit(amount);
    expect(account.getBalance()).toBe(balance + amount);
  });

  test('should withdraw money', () => {
    const amount = 50;
    account.withdraw(amount);
    expect(account.getBalance()).toBe(balance - amount);
  });

  test('should transfer money', () => {
    const accountForTransfer = getBankAccount(balance);
    const amount = 50;
    account.transfer(amount, accountForTransfer);
    expect(account.getBalance()).toBe(balance - amount);
    expect(accountForTransfer.getBalance()).toBe(balance + amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValueOnce(15).mockReturnValueOnce(1);

    const myBalance = await account.fetchBalance();
    expect(typeof myBalance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const amount = 55;
    jest.spyOn(lodash, 'random').mockReturnValueOnce(amount);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(amount);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
