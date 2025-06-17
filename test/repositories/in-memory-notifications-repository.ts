import type { NotificationsRepository } from "@/domain/notification/application/repositories/notifications-repository";
import type { Notification } from "@/domain/notification/enterprise/entities/notification";

export class InMemoryNotificationsRepository
	implements NotificationsRepository
{
	private items: Notification[] = [];

	async create(notification: Notification): Promise<void> {
		this.items.push(notification);
	}
}
