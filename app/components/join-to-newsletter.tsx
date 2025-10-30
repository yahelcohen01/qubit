export const JoinToNewsletter = ({
  showTitle = true,
}: {
  showTitle?: boolean;
}) => {
  return (
    <div className="flex flex-col justify-start">
      {showTitle && (
        <h4 className="text-base font-semibold text-white mb-3">
          Subscribe to Our Newsletter
        </h4>
      )}
      <div data-supascribe-embed-id="629224468633" data-supascribe-subscribe />
      <script
        src="https://js.supascribe.com/v1/loader/3b21i4kr1zfvQgCIVkmI42bpsZC3.js"
        async
      ></script>
    </div>
  );
};
