import { makeAnswer } from "test/factories/make-answer";
import { makeAnswerComment } from "test/factories/make-answer-comment";
import { makeQuestion } from "test/factories/make-question";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { waitFor } from "test/utils/wait-for";
import type { MockInstance } from "vitest/dist/index.js";
import { SendNotificationUseCase } from "../use-cases/send-notification";
import { OnAnswerCommentCreated } from "./on-answer-comment-created";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

let sendNotificationExecuteSpy: MockInstance<
	SendNotificationUseCase["execute"]
>;

describe("On Answer Created", () => {
	beforeEach(() => {
		inMemoryAnswerAttachmentsRepository =
			new InMemoryAnswerAttachmentsRepository();
		inMemoryQuestionAttachmentsRepository =
			new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionAttachmentsRepository,
		);
		inMemoryAnswersRepository = new InMemoryAnswersRepository(
			inMemoryAnswerAttachmentsRepository,
		);
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
		sut = new SendNotificationUseCase(inMemoryNotificationsRepository);

		sendNotificationExecuteSpy = vi.spyOn(sut, "execute");

		new OnAnswerCommentCreated(
			inMemoryAnswersRepository,
			inMemoryQuestionsRepository,
			sut,
		);
	});

	it("should send a notification when an answer is created", async () => {
		const question = makeQuestion();
		const answer = makeAnswer({
			questionId: question.id,
		});
		const answerComment = makeAnswerComment({
			answerId: answer.id,
		});
		inMemoryQuestionsRepository.create(question);
		inMemoryAnswersRepository.create(answer);
		inMemoryAnswerCommentsRepository.create(answerComment);

		await waitFor(() => {
			expect(sendNotificationExecuteSpy).toHaveBeenCalled();
		});
	});
});
