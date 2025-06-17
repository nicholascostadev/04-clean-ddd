import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository";
import { SendNotificationUseCase } from "./send-notification";

let notificationsRepository: InMemoryNotificationsRepository;
let sendNotification: SendNotificationUseCase;

describe("Send Notification", () => {
	beforeEach(() => {
		notificationsRepository = new InMemoryNotificationsRepository();
		sendNotification = new SendNotificationUseCase(notificationsRepository);
	});

	it("should be able to send a notification", async () => {
		const result = await sendNotification.execute({
			recipientId: "1",
			title: "Notification title",
			content: "Notification content",
		});

		expect(result.isRight()).toBe(true);
	});
});
