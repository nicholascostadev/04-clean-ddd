import type { AnswersRepository } from "@/domain/forum/application/repositories/answers-repsitory";
import type { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
	items: Answer[] = [];

	async create(answer: Answer) {
		this.items.push(answer);
	}
}
