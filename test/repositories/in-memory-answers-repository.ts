import type { AnswersRepository } from "@/domain/forum/application/repositories/answers-repsitory";
import type { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
	items: Answer[] = [];

	async create(answer: Answer) {
		this.items.push(answer);
	}

	async findById(id: string) {
		const answer = this.items.find((item) => item.id.toString() === id);

		if (!answer) {
			return null;
		}

		return answer;
	}

	async delete(answer: Answer) {
		const answerIndex = this.items.findIndex((item) => item.id === answer.id);
		this.items.splice(answerIndex, 1);
	}
}
