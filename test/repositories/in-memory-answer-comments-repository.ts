import type { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import type { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository
	implements AnswerCommentsRepository
{
	items: AnswerComment[] = [];

	async create(answerComment: AnswerComment) {
		this.items.push(answerComment);
	}

	async findById(id: string) {
		const answerComment = this.items.find((item) => item.id.toString() === id);

		return answerComment ?? null;
	}

	async delete(answerComment: AnswerComment) {
		const answerCommentIndex = this.items.findIndex(
			(item) => item.id === answerComment.id,
		);

		this.items.splice(answerCommentIndex, 1);
	}
}
