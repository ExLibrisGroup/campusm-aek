import React, { useCallback, useEffect, useState } from "react";
import { extend, has, isEmpty } from "lodash";
import { request } from "@ombiel/aek-lib";
import {
  BannerHeader,
  BasicSegment,
  Button,
  Form,
  Notifier,
  Page,
  validateEmail,
} from "@ombiel/cm-lib";

export function SendEmailWithFormData() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: null,
    recipient: null,
    input: null,
  });
  const fields = [
    {
      name: "subject",
      label: "Email Subject",
      required: true,
      type: "select",
      options: [
        "Report an issue",
        "Provide app feedback",
        "Suggest an app idea",
      ],
    },
    {
      name: "recipient",
      label: "Email Recipient",
      required: true,
      type: "email",
    },
    { name: "input", label: "Email Body", required: true, type: "textarea" },
  ];
  const [validation, setValidation] = useState({ valid: false, messages: {} });

  const handleChange = useCallback(
    (e, name, value) => {
      const updatedFormData = extend({}, formData, { [name]: value });
      setFormData(updatedFormData);
    },
    [formData]
  );

  const triggerMessage = useCallback((isError) => {
    const title = isError ? "Error" : "Success";
    const notifierMessage = isError
      ? "An error has occurred."
      : "Your email has been sent!";
    const level = isError ? "error" : "success";

    Notifier.add({
      title: title,
      message: notifierMessage,
      level: level,
      dismissible: true,
    });
  }, []);

  const handleClick = useCallback(() => {
    setLoading(true);

    request
      .action("send-email")
      .send({ data: JSON.stringify(formData) })
      .end((err, response) => {
        const body = response.body;
        const success = !isEmpty(body) && has(body, "success");
        if (!err && response && success) {
          triggerMessage(false);
        } else {
          triggerMessage(true);
        }

        setLoading(false);
        setFormData({
          subject: null,
          recipient: null,
          input: null,
        });
      });
  }, [formData, triggerMessage]);

  useEffect(() => {
    // Check that all fields have values.
    const isFilled = formData.subject && formData.recipient && formData.input;

    // Check if email is valid.
    let isEmailValid = true;
    const messages = {};
    if (formData.recipient && !validateEmail(formData.recipient)) {
      messages.recipient = "Please enter a valid email.";
      isEmailValid = false;
    }

    setValidation({ valid: isFilled && isEmailValid, messages: messages });
  }, [formData.input, formData.recipient, formData.subject]);

  return (
    <Page>
      <BannerHeader
        level={2}
        style={{
          backgroundColor: "#286DC0",
          color: "#ffffff",
          paddingLeft: 0,
          paddingRight: 0,
        }}
        key="header"
      >
        Send Email With Form Data
      </BannerHeader>

      <BasicSegment
        loading={loading}
        style={{ paddingLeft: "1.5em", paddingRight: "1.5em" }}
      >
        <Form
          fields={fields}
          data={formData}
          onChange={handleChange}
          validation={validation}
        />
        <div style={{ textAlign: "center", marginTop: "1em" }}>
          <Button
            type="submit"
            disabled={!validation.valid}
            onClick={handleClick}
          >
            Send
          </Button>
        </div>
      </BasicSegment>
    </Page>
  );
}
