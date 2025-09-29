package com.example.mygmail;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.example.mygmail.net.ApiService;

import java.util.ArrayList;
import java.util.List;

public class MailAdapter extends RecyclerView.Adapter<MailAdapter.MailHolder> {
    public interface OnMailClick { void onMailClick(ApiService.MailDto mail, int position); }
    public interface OnMailDeleteClick { void onMailDelete(ApiService.MailDto mail, int position); }
    public interface OnMailActionListener { void onAction(ApiService.MailDto mail, int position); }

    private final List<ApiService.MailDto> data = new ArrayList<>();
    private OnMailClick clickListener;
    private OnMailDeleteClick deleteListener;
    private OnMailActionListener spamListener;
    private OnMailActionListener draftsListener;

    public void setOnMailClick(OnMailClick l) { this.clickListener = l; }
    public void setOnMailDelete(OnMailDeleteClick l) { this.deleteListener = l; }
    public void setOnMailSpam(OnMailActionListener l) { this.spamListener = l; }
    public void setOnMailDrafts(OnMailActionListener l) { this.draftsListener = l; }

    public void setMails(List<ApiService.MailDto> mails) {
        data.clear();
        if (mails != null) data.addAll(mails);
        notifyDataSetChanged();
    }

    public ApiService.MailDto getItem(int position){ return data.get(position); }

    public void removeAt(int position) { if (position < 0 || position >= data.size()) return; data.remove(position); notifyItemRemoved(position); }
    public void insertAt(int position, ApiService.MailDto mail) { if (position < 0 || position > data.size()) position = data.size(); data.add(position, mail); notifyItemInserted(position); }
    @Override
    public MailHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.row_mail, parent, false);
        return new MailHolder(v);
    }

    @Override
    public void onBindViewHolder(MailHolder h, int position) {
        ApiService.MailDto m = data.get(position);

        h.tvSubject.setText(m.subject != null ? m.subject : "(no subject)");
        String from = (m.from != null && m.from.name != null) ? m.from.name
                : (m.from != null && m.from.email != null) ? m.from.email : "";
        h.tvFrom.setText(from);
        h.tvDate.setText(m.date != null ? m.date : "");
        h.itemView.setAlpha(m.read ? 0.6f : 1f);

        h.itemView.setOnClickListener(v -> {
            if (clickListener == null) return;
            int pos = h.getAdapterPosition();
            if (pos != RecyclerView.NO_POSITION) clickListener.onMailClick(data.get(pos), pos);
        });

        h.btnDelete.setOnClickListener(v -> {
            if (deleteListener == null) return;
            int pos = h.getAdapterPosition();
            if (pos != RecyclerView.NO_POSITION) deleteListener.onMailDelete(data.get(pos), pos);
        });

        h.btnSpam.setOnClickListener(v -> {
            if (spamListener == null) return;
            int pos = h.getAdapterPosition();
            if (pos != RecyclerView.NO_POSITION) spamListener.onAction(data.get(pos), pos);
        });

        h.btnDrafts.setOnClickListener(v -> {
            if (draftsListener == null) return;
            int pos = h.getAdapterPosition();
            if (pos != RecyclerView.NO_POSITION) draftsListener.onAction(data.get(pos), pos);
        });
    }

    @Override public int getItemCount() { return data.size(); }

    static class MailHolder extends RecyclerView.ViewHolder {
        final TextView tvSubject, tvFrom, tvDate;
        final View btnDelete, btnSpam, btnDrafts;
        MailHolder(View itemView) {
            super(itemView);
            tvSubject = itemView.findViewById(R.id.tvSubject);
            tvFrom    = itemView.findViewById(R.id.tvFrom);
            tvDate    = itemView.findViewById(R.id.tvDate);
            btnDelete = itemView.findViewById(R.id.btnDelete);
            btnSpam   = itemView.findViewById(R.id.btnSpam);
            btnDrafts = itemView.findViewById(R.id.btnDrafts);
        }
    }
}
