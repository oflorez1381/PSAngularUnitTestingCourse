import {MessageService} from './message.service';

describe('Message Service', () => {
  let sut: MessageService;

  beforeEach(() => {
    sut = new MessageService();
  });

  it('should have no messages to start', () => {
    expect(sut.messages.length).toEqual(0);
  });

  it('should add a message when add is called', () => {
    sut.add('message 1');

    expect(sut.messages.length).toEqual(1);
  });

  it('should remove all messages when clear is called', () => {
    sut.add('message 1');

    sut.clear();

    expect(sut.messages.length).toEqual(0);
  });

});
